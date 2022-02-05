import { fetchJson } from 'fetch-json';
class Aero {
    static data = async () => {
        let aeroegld = await fetchJson.get("https://gateway.elrond.com/address/erd1qqqqqqqqqqqqqpgqzjctu8xrgn8jmfp503tajjvzz2zq60v92jpsslkh5a/esdt");
        let egldusdc = await fetchJson.get("https://gateway.elrond.com/address/erd1qqqqqqqqqqqqqpgqeel2kumf0r8ffyhth7pqdujjat9nx0862jpsg2pqaq/esdt");

        let aero = aeroegld['data']['esdts']['AERO-458bbf']['balance'].slice(0, -18);
        let egld = aeroegld['data']['esdts']['WEGLD-bd4d79']['balance'].slice(0, -18);
        let usdc = egldusdc['data']['esdts']['USDC-c76f1f']['balance'].slice(0, -6);
        let egld2 = egldusdc['data']['esdts']['WEGLD-bd4d79']['balance'].slice(0, -18);
        return { aero, egld, usdc, egld2 };
    }
    static index = async (req, res) => {
        let data = await this.data();
        let { aero, egld, usdc, egld2 } = data;
        res.render('aero', { data: { RU: (egld / aero * usdc / egld2).toPrecision(4), RE: (egld / aero).toPrecision(8) }, layout: 'layouts/aero' });
    }
    static transactionList = async (req, res) => {
        let list = await fetchJson.get("https://api.elrond.com/tokens/AERO-458bbf/transactions?status=success&size=100");
        list = list.filter(function(item) {
            if (this.count < 20 && item.action.name=="swap" && item.action.description) {
              this.count++;
              return true;
            }
            return false;
          }, {count: 0});
        let { aero, egld ,usdc,egld2} = await this.data();
        let RU = (egld / aero * usdc / egld2).toPrecision(4);

        res.json({list,RU});
    }
    static getData = async (req, res) => {
        let data = await this.data();
        let { aero, egld, usdc, egld2 } = data;
        res.json({ RU: (egld / aero * usdc / egld2).toPrecision(4), RE: (egld / aero).toPrecision(6) })
    }
    static richList = async (req, res) => {
        let address = req.params.address;
        let data = await fetchJson.get("https://api.elrond.com/tokens/aero/accounts?size=10000");

        let index;
        for (const element of data) {
            if (address == element.address) {
                index = data.indexOf(element);
                console.log(index);
                break;
            }
        }
        if (index >= 0) {
            res.status(200).json(index);
        } else {
            res.status(400).json("Wrong wallet or not in the top 10,000 :(")
        }
    }
}

export { Aero }