import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { login_user } from '~/api/auth';
import { Button, Form, InputField } from '~/components/elements';
import { adduserRedux } from '~/core/redux/slices/userSlice';
import { AuthLoginRequestPayload } from '~/core/types/auth';
import { addTokensRedux } from '~/core/redux/slices/tokensSlice';
import { IMAGES } from '~/assets/images';

const schema = z.object({
    username: z.string().min(1, 'Email or Username is required'),
    password: z.string().min(1, 'Password is required'),
});

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (payload: AuthLoginRequestPayload) => {
        try {
            setError('');
            setIsLoading(true);
            const data = await login_user(payload);
            const { tokens, user } = data.payload;
            dispatch(adduserRedux(user));
            dispatch(addTokensRedux(tokens));
            navigate('/dashboard');
        } catch (error: any) {
            setError(error.response.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Login - Library MIS</title>
            </Helmet>
            <div className="flex h-screen w-screen object-cover">
                <img
                    src={IMAGES.CreateAccoutBackgroundImage}
                    alt="Page Desc Image"
                    className="hidden xl:block xl:w-3/5"
                />
                <section className="flex h-full w-full items-center justify-center py-20 lg:py-[120px] xl:w-2/5">
                    <div className="container mx-auto">
                        <div className="-mx-4 flex flex-wrap">
                            <div className="w-full px-4 ">
                                <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-20 px-10 sm:px-12 md:px-[60px]">
                                    <div className="flex flex-col pb-3 text-xl font-semibold">
                                        <span>Hey,</span>
                                        <span>Login Here</span>
                                    </div>
                                    <Form<
                                        AuthLoginRequestPayload,
                                        typeof schema
                                    >
                                        schema={schema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ register, formState }) => (
                                            <>
                                                <div className="flex flex-col gap-4">
                                                    <InputField
                                                        placeholder="Enter Your Username or Email"
                                                        error={
                                                            formState.errors
                                                                .username
                                                        }
                                                        registration={register(
                                                            'username'
                                                        )}
                                                        className="h-10 text-xs"
                                                        isLoading={isLoading}
                                                        type="text"
                                                    />

                                                    <InputField
                                                        placeholder="Enter Your Password"
                                                        error={
                                                            formState.errors
                                                                .password
                                                        }
                                                        registration={register(
                                                            'password'
                                                        )}
                                                        className="h-10 py-0 text-xs"
                                                        isLoading={isLoading}
                                                        type="password"
                                                    />
                                                </div>

                                                <p className="md:text-md mt-3 text-xs">
                                                    Forgot your password?
                                                    <Link
                                                        to={
                                                            '/auth/reset-password'
                                                        }
                                                        className="hover:text-primary md:text-md mx-1  mt-3 inline-block text-xs text-primary-500 underline hover:underline"
                                                    >
                                                        Reset
                                                    </Link>
                                                </p>

                                                <p className="md:text-md mt-3 text-xs">
                                                    Don't have an account?
                                                    <Link
                                                        to={'/auth/register'}
                                                        className="mx-1 text-primary-500 underline hover:underline"
                                                    >
                                                        Register
                                                    </Link>
                                                </p>

                                                {error && (
                                                    <div className="md:text-md flex flex-col gap-4 pt-2 text-xs">
                                                        <p className="text-red-600">
                                                            {error}
                                                        </p>
                                                    </div>
                                                )}
                                                <Button
                                                    type="submit"
                                                    variant="bg-primary-500"
                                                    className="mt-4 w-full text-xs font-semibold"
                                                    isLoading={isLoading}
                                                >
                                                    Login
                                                </Button>
                                            </>
                                        )}
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default LoginPage;
