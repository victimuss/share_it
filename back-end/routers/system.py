from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter(tags=["System"])

@router.get("/.well-known/assetlinks.json")
async def get_android_assetlinks():
    data = [{
            "relation": ["delegate_permission/common.handle_all_urls"],
            "target": {
                "namespace": "android_app",
                "package_name": "com.yourname.sparkedu",
                "sha256_cert_fingerprints": [
                    "XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX"
                ]
            }
        }]
    return JSONResponse(content=data)

@router.get("/.well-known/apple-app-site-association")
async def get_ios_aasa():
    data = {
        "applinks": {
            "apps": [],
            "details": [
                {
                    "appID": "TEAMID.com.yourname.sparkedu",
                    "paths": [
                        "/lesson/*",  
                        "/profile/*"
                    ]
                }
            ]
        }
    }
    return JSONResponse(content=data)