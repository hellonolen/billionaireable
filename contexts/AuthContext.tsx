import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation, useAction } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Id } from '../convex/_generated/dataModel';

interface User {
    _id: Id<"users">;
    email: string;
    name?: string;
    imageUrl?: string;
    isAdmin?: boolean;
    onboardingComplete?: boolean;
    currentPillar?: number;
    focusAreas?: string[];
    netWorth?: number;
}

interface AuthContextType {
    user: User | null;
    isLoaded: boolean;
    isSignedIn: boolean;
    signIn: (email: string, name?: string) => Promise<{ success: boolean; type: string }>;
    verifyCode: (email: string, code: string, name?: string) => Promise<boolean>;
    signOut: () => Promise<void>;
    sessionToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'billionaireable_session';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sessionToken, setSessionToken] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(SESSION_KEY);
        }
        return null;
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [pendingEmail, setPendingEmail] = useState<string | null>(null);
    const [pendingName, setPendingName] = useState<string | null>(null);

    // Get current user from session
    const user = useQuery(
        api.auth.getCurrentUser,
        sessionToken ? { sessionToken } : { sessionToken: undefined }
    );

    // Mutations
    const requestCodeMutation = useMutation(api.auth.requestCode);
    const verifyCodeMutation = useMutation(api.auth.verifyCode);
    const signOutMutation = useMutation(api.auth.signOut);
    const sendEmailAction = useAction(api.auth.sendVerificationEmail);

    // Handle loading state
    useEffect(() => {
        // If no session token, we're loaded immediately (not signed in)
        if (!sessionToken) {
            setIsLoaded(true);
            return;
        }
        // If we have a session and user query completed
        if (user !== undefined) {
            setIsLoaded(true);
        }
    }, [user, sessionToken]);

    // Clear invalid session
    useEffect(() => {
        if (isLoaded && sessionToken && user === null) {
            localStorage.removeItem(SESSION_KEY);
            setSessionToken(null);
        }
    }, [isLoaded, sessionToken, user]);

    const signIn = async (email: string, name?: string): Promise<{ success: boolean; type: string }> => {
        try {
            const result = await requestCodeMutation({ email, name });

            // Store pending info for verification
            setPendingEmail(email);
            if (name) setPendingName(name);

            // Send the email (non-blocking - don't fail if email service is down)
            sendEmailAction({
                email: result.email,
                code: result._code,
                type: result.type,
                name: result.name,
            }).catch((err) => {
                console.warn('Email send failed (user can still use master code):', err);
            });

            return { success: true, type: result.type };
        } catch (error) {
            console.error('Sign in error:', error);
            throw error;
        }
    };

    const verifyCode = async (email: string, code: string, name?: string): Promise<boolean> => {
        try {
            const result = await verifyCodeMutation({ 
                email, 
                code,
                name: name || pendingName || undefined,
            });
            
            if (result.success && result.sessionToken) {
                localStorage.setItem(SESSION_KEY, result.sessionToken);
                setSessionToken(result.sessionToken);
                setPendingEmail(null);
                setPendingName(null);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Verify code error:', error);
            throw error;
        }
    };

    const signOut = async (): Promise<void> => {
        if (sessionToken) {
            try {
                await signOutMutation({ sessionToken });
            } catch (error) {
                console.error('Sign out error:', error);
            }
        }
        localStorage.removeItem(SESSION_KEY);
        setSessionToken(null);
    };

    const value: AuthContextType = {
        user: user || null,
        isLoaded,
        isSignedIn: !!user,
        signIn,
        verifyCode,
        signOut,
        sessionToken,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Convenience hooks to match Clerk-like API
export const useUser = () => {
    const { user, isLoaded, isSignedIn } = useAuth();
    return { user, isLoaded, isSignedIn };
};

