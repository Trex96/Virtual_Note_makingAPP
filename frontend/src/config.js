const config = {

  MAX_ATTACHMENT_SIZE: 5000000,

  s3: {
    REGION: "ap-south-1",
    BUCKET: "virtualnotes-notes-storages-uploadsbucketc4b27cc7-dyeplx3tgwsu",
  },
  apiGateway: {
    REGION: "ap-south-1",
    URL: "https://u2knkn4s6a.execute-api.ap-south-1.amazonaws.com",
  },
  cognito: {
    REGION: "ap-south-1",
    USER_POOL_ID: "ap-south-1_mLoe2sVA2",
    APP_CLIENT_ID: "13djfuadjq7eu0gva7p1bc987j",
    IDENTITY_POOL_ID:"ap-south-1:112efbdd-bca4-46a6-81f5-00c8f41e6711",
  },
};

export default config;