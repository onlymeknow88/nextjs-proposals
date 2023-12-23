import { Link } from "@nextui-org/react";


export default function Custom404() {
  return (
    <>
      <div className="m-4 flex flex-col gap-4">
        <span className="text-3xl text-red-500">
          You are not Authorized or session has expired.
        </span>
        <span className="text-lg">
          Please login from <Link href="http://amclmptstge01/homepage">Homepage</Link>.
        </span>
      </div>
    </>
  );
}
