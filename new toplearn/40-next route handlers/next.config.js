/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"rosepack.com",
                port:""
            }
        ]
    }
}

module.exports = nextConfig
