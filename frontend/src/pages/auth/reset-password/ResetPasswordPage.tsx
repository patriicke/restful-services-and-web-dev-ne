import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { request_reset_password } from '~/api/auth';
import { IMAGES } from '~/assets/images';
import { Button, Form, InputField } from '~/components/elements';
import { CustomError } from '~/core/libs';
import { AuthRequestResetPasswordRequestPayload } from '~/core/types/auth';

const schema = z.object({
    email: z.string().min(1, 'Please enter your email is required').email(),
});

export type RegisterPayload = {
    email: string;
};

const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();

    const [error, setError] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (
        payload: AuthRequestResetPasswordRequestPayload
    ) => {
        try {
            setError('');
            setIsLoading(true);
            await request_reset_password(payload);
            sessionStorage.setItem('resetting_email', payload.email);
            navigate('/auth/reset-password-verification');
        } catch (error: any) {
            if (error instanceof CustomError) setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <Helmet>
                <title>Reset Password Verification- Library MIS</title>
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
                                        <span>Reset your password here</span>
                                    </div>
                                    <Form<RegisterPayload, typeof schema>
                                        schema={schema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ register, formState }) => (
                                            <>
                                                <div className="flex flex-col gap-4">
                                                    <InputField
                                                        placeholder="Enter Your Email"
                                                        error={
                                                            formState.errors
                                                                .email
                                                        }
                                                        registration={register(
                                                            'email'
                                                        )}
                                                        className="h-10 text-xs"
                                                        isLoading={isLoading}
                                                        type="text"
                                                    />
                                                </div>

                                                <div className="pt-3 text-xs">
                                                    <p>
                                                        Enter your email, we'll
                                                        send you a verification
                                                        code
                                                    </p>
                                                </div>

                                                <p className="md:text-md mt-3 text-xs">
                                                    Don't have an account?
                                                    <Link
                                                        to={'/auth/login'}
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
                                                    Submit
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

export default ResetPasswordPage;
