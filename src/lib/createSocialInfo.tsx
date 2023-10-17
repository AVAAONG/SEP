import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from 'public/svgs/SocialNetworks';

const createSocialMediaIcons = (
  twitterUser: string | null,
  facebookUser: string | null,
  instagramUser: string | null,
  linkedinUser: string | null
) => {
  const socialNetworks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/${twitterUser ?? ''}`,
      icon: <TwitterIcon />,
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/${facebookUser ?? ''}`,
      icon: <FacebookIcon />,
    },
    {
      name: 'Instagram',
      url: `https://www.instagram.com/${instagramUser ?? ''}`,
      icon: <InstagramIcon />,
    },
    {
      name: 'Linkedin',
      url: linkedinUser,
      icon: <LinkedinIcon />,
    },
  ];
  return socialNetworks;
};

export default createSocialMediaIcons;
