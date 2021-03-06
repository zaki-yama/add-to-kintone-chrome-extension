import { KintoneRestAPIClient } from "@kintone/rest-api-client";
import { Options, ProductInfo } from "./typings";

export async function saveRecord(productInfo: ProductInfo, options: Options) {
  const params = {
    app: options.appId,
    record: {
      [options.titleFieldCode]: { value: productInfo.title },
      [options.urlFieldCode]: { value: productInfo.url },
      [options.imageUrlFieldCode]: { value: productInfo.imageUrl },
    },
  };
  const client = new KintoneRestAPIClient({
    baseUrl: `https://${options.subdomain}.cybozu.com`,
    auth: {
      apiToken: options.apiToken,
    },
  });
  const result = await client.record.addRecord(params);
  return result.id as string;
}
