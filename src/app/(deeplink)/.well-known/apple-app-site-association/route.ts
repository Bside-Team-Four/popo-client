import { NextApiResponse } from "next";

export async function GET(_, res:NextApiResponse) {
    return res.json({
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
  