import Login from "@/src/pages/Login"
import Register from "@/src/pages/Register"

export default function Page({searchParams}: { searchParams?: { [key: string]: string } }) {
    // @ts-ignore
    let isNewUser = (searchParams["state"] !== undefined);
    if (isNewUser) {
        return (
            <Register/>
        );
    }
    return (
        <Login/>
    )

};
