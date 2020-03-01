import { render } from '@jaredpalmer/after';
import document from '~/client/document';
import routes from '~/client/pages';

interface Props {
  error?: any;
  req: any;
  res: any;
}
// eslint-disable-next-line
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);

async function html({ error, req, res }: Props) {
  const htmlString = await render({
    assets,
    routes,
    document,
    req,
    res,
    // eslint-disable-next-line
    // @ts-ignore
    error,
  });

  return htmlString;
}

export default html;
