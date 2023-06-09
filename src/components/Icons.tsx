import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const XrpLogoSvg = () => (
  <svg
    width="16"
    height="16"
    id="Layer_1"
    version="1.1"
    viewBox="0 0 226.777 226.777"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M196.224,139.515c-7.59-4.162-15.848-6.09-23.981-6.026l0.069-0.039c-11.158,0.128-20.311-8.55-20.442-19.38  c-0.129-10.686,8.565-19.467,19.505-19.832v-0.005l-0.02-0.01c8.276-0.04,16.649-2.145,24.277-6.547  c22.81-13.165,30.309-41.787,16.749-63.93C198.818,1.602,169.334-5.677,146.524,7.488c-22.81,13.164-30.308,41.787-16.747,63.93  c5.648,9.227,2.526,21.152-6.978,26.638c-9.369,5.407-21.433,2.534-27.188-6.383l-0.005,0.002V91.7  c-4.147-6.951-10.189-12.956-17.913-17.192C54.59,61.836,25.276,69.744,12.223,92.175c-13.053,22.426-4.903,50.882,18.201,63.553  c23.105,12.672,52.415,4.763,65.469-17.667c0.079-0.135,0.149-0.275,0.226-0.411v0.033l0.005,0.002  c5.545-9.054,17.555-12.191,27.047-6.985c9.628,5.281,13.021,17.136,7.583,26.48c-13.055,22.431-4.904,50.885,18.199,63.555  c23.104,12.673,52.417,4.763,65.47-17.667C227.474,180.64,219.327,152.187,196.224,139.515z"
      id="XRP"
    />
  </svg>
);

export const XrpLogoIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={XrpLogoSvg} {...props} />
);

const IpfsLogoSvg = () => (
  <svg width={16} height={16} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>IPFS icon</title>
    <path d="M12 0L1.608 6v12L12 24l10.392-6V6zm-1.073 1.445h.001a1.8 1.8 0 002.138 0l7.534 4.35a1.794 1.794 0 000 .403l-7.535 4.35a1.8 1.8 0 00-2.137 0l-7.536-4.35a1.795 1.795 0 000-.402zM21.324 7.4c.109.08.226.147.349.201v8.7a1.8 1.8 0 00-1.069 1.852l-7.535 4.35a1.8 1.8 0 00-.349-.2l-.009-8.653a1.8 1.8 0 001.07-1.851zm-18.648.048l7.535 4.35a1.8 1.8 0 001.069 1.852v8.7c-.124.054-.24.122-.349.202l-7.535-4.35a1.8 1.8 0 00-1.069-1.852v-8.7c.124-.054.24-.122.35-.202z" />
  </svg>
);

export const IpfsLogoIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={IpfsLogoSvg} {...props} />
);
