import { NextRequest, NextResponse } from "next/server";


export async function GET( req : NextRequest) {

const res = await fetch("https://localhost:3000/api/users")   

const data = await res.json();

return NextResponse.json(data)



}

