import { Button, Result, Typography, Spin } from "antd";
import { useRouter } from "next/router";
import { useCallback, useContext, useState } from "react";
import { Wallet } from "xrpl";
import { Maybe } from "monet";
import useDidMount from "beautiful-react-hooks/useDidMount";
import useLocalStorage from "beautiful-react-hooks/useLocalStorage";

import { LS_KEY } from "~/consts";
import { XrpLedgerContext, useXrpLedgerClient } from "~/hooks/useXrpLedgerHook";

export default function Create() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { client, network } = useXrpLedgerClient();
  const { setWallet: setContextWallet, setWallets } =
    useContext(XrpLedgerContext);
  const [wallet, setWallet] = useState<Wallet>();
  const [walletSeeds, setWalletSeeds] = useLocalStorage<string[]>(
    `${LS_KEY.WALLET_SEEDS}/${network}`,
    []
  );

  const generateWallet = useCallback(() => {
    setLoading(true);
    client.forEach((c) => {
      // warn: testnet logic only
      c.fundWallet()
        .then((res) => {
          setWallet(res.wallet);

          const seeds = res.wallet.seed
            ? [...(walletSeeds ?? []), res.wallet.seed]
            : walletSeeds ?? [];

          setWalletSeeds(seeds);

          const wallets = seeds.map((seed) => Wallet.fromSeed(seed)) ?? [];

          setWallets(wallets);
          setContextWallet(Maybe.Some(wallets[0]));
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [client, setContextWallet, setWalletSeeds, setWallets, walletSeeds]);

  useDidMount(() => {
    generateWallet();
  });

  return (
    <div className="relative w-100vw h-100vh">
      <div className="absolute top-50% left-50% transform translate-x-[-50%] translate-y-[-50%]">
        {wallet ? (
          <Result
            className="w-700px"
            status="success"
            title="Successfully Create XRP Ledger Account!"
            subTitle={
              <div className="mt-4 text-left">
                <div className="flex">
                  <span className="mr-4">Address:</span>
                  <span className="flex-auto" />
                  <Typography.Text copyable>{wallet.address}</Typography.Text>
                </div>
                <div className="flex">
                  <span className="mr-4">Public Key:</span>
                  <span className="flex-auto" />
                  <Typography.Text copyable>{wallet.publicKey}</Typography.Text>
                </div>
                <div className="flex">
                  <span className="mr-4">Private Key:</span>
                  <span className="flex-auto" />
                  <Typography.Text copyable>
                    {wallet.privateKey}
                  </Typography.Text>
                </div>
                <div className="flex">
                  <span className="mr-4">Seed:</span>
                  <span className="flex-auto" />
                  <Typography.Text copyable>{wallet.seed}</Typography.Text>
                </div>
              </div>
            }
            extra={[
              <Button
                type="primary"
                key="go_dashboard"
                onClick={() => router.replace("/")}
              >
                Go Dashboard
              </Button>,
            ]}
          />
        ) : (
          <div className="relative w-100vw h-100vh">
            <div className="absolute top-50% left-50% transform translate-x-[-50%] translate-y-[-50%]">
              <Spin className="m-auto" tip="You're almost there..." />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Create.getLayout = function getLayout(page: React.ReactElement) {
  return page;
};
