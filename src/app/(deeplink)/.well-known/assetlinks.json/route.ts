import { NextApiRequest, NextApiResponse } from "next";

export async function GET(_, res:NextApiResponse) {
    return res.json([{
      "relation": [ "delegate_permission/common.handle_all_urls" ],
      "target": {
        "namespace": "android_app",
        "package_name": "com.foya.popo.app",
        "sha256_cert_fingerprints":["73:1F:F1:0F:D4:7A:25:3B:FD:69:3C:10:C1:58:D2:6E:5B:01:15:A7:AD:70:7B:4C:76:C8:E4:4D:AD:7E:DF:30"],
      },
    }]);
  }
  