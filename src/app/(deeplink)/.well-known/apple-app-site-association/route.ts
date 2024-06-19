import { NextResponse } from "next/server";

export async function GET() {
    return  NextResponse.json({
      "applinks": {
        "apps": [
          {
            "appID": "2K58P6T45W.com.4ya.popo.app",
            "paths": [ "*/onelink/*" ],
          },
        ],
        "details": [
          {
            "appID": "2K58P6T45W.com.4ya.popo.app",
            "paths": [ "*/onelink/*" ],
          },
        ],
      },
    });
  }
  