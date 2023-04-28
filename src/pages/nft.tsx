import {
  Button,
  Form,
  Input,
  InputNumber,
  Typography,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  Client,
  NFTokenMintFlags,
  Payment,
  TxResponse,
  dropsToXrp,
  xrpToDrops,
} from "xrpl";
import { IPFS } from "ipfs-core";

import {
  useIPFS,
  useXrpLedgerClient,
  useXrpLedgerWallet,
} from "~/hooks/useXrpLedgerHook";
import { hexEncode, generateNFTokenTaxon } from "~/utils";

const onFinishFailed = (errorInfo: any) => {
  console.error("Failed:", errorInfo);
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function NFT() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { client } = useXrpLedgerClient();
  const { wallet } = useXrpLedgerWallet();
  const { ipfs } = useIPFS();

  return (
    <div>
      <Typography.Title className="text-center" level={2}>
        NTF
      </Typography.Title>
      <Form
        disabled={loading}
        className="w-60% mx-auto"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={async (values) => {
          setLoading(true);

          wallet
            .map((w) => (c: Client) => (ipfs: IPFS) => {
              const attachment = values.attachment[0];
              const taxon = generateNFTokenTaxon();

              return ipfs.add(attachment.originFileObj).then(({ cid }) => {
                return c
                  .autofill({
                    TransactionType: "NFTokenMint",
                    NFTokenTaxon: taxon,
                    Account: w.address,
                    // todo: need to bind NFTokenMinter to AccountRoot
                    // Issuer: w.address,
                    Flags: NFTokenMintFlags.tfTransferable,
                    URI: hexEncode(cid.toString()),
                    Memos: [
                      {
                        Memo: {
                          MemoType: hexEncode(encodeURI("mimetype")),
                          MemoData: hexEncode(encodeURI(attachment.type)),
                        },
                      },
                    ],
                  })
                  .then((prepared) => {
                    return c.submitAndWait(w.sign(prepared).tx_blob);
                  });
              });
            })
            .apTo(client)
            .apTo(ipfs)
            .forEach((defer) => {
              defer
                .then((res: TxResponse) => {
                  message.success(`TX ${res.id} Confirmed`);
                })
                .finally(() => {
                  setLoading(false);
                });
            });
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="address"
          rules={[{ required: true, message: "Please input the NFT name!" }]}
        >
          <Input placeholder="rEJfLEEDvrdGwK8gszQa9bL2TYd8Cek5Fp" />
        </Form.Item>
        <Form.Item
          label="Attachment"
          name="attachment"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload the attachment!" }]}
        >
          <Upload maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item className="text-right" wrapperCol={{ offset: 18, span: 6 }}>
          <Button loading={loading} type="primary" htmlType="submit">
            Mint
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
