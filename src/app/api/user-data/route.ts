import { NextRequest, NextResponse } from "next/server";
import fetchUserData from "@/app/api/user-data/fetchUserData";

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId")

    if (!userId) {
        return NextResponse.json({ message: "Invalid request, required userId!" }, { status: 403 })
    }

    // TODO: check if the user exists in the db and then only fetch the user details
    try {
        const languages = await fetchUserData(userId);
        return NextResponse.json({ languages }, { status: 200 })
    } catch (err) {
        console.error("Unable to fetch user details", err)
        return NextResponse.json({ message: "Server Side Error." }, { status: 500 })
    }
}

