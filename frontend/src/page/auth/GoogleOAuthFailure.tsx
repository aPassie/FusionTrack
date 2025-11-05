const GoogleOAuthFailure = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">OAuth Authentication Failed</h1>
        <p className="text-muted-foreground">There was an error with Google authentication</p>
      </div>
    </div>
  );
};

export default GoogleOAuthFailure;
