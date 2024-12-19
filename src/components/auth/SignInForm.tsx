import GoogleSignInButton from "./GoogleSignInButton";

interface SignInFormProps {
  callbackUrl?: string;
}

export default function SignInForm({ callbackUrl = "/dashboard" }: SignInFormProps) {
  return (
    <div className="space-y-4">
      <GoogleSignInButton callbackUrl={callbackUrl} />
    </div>
  );
}
