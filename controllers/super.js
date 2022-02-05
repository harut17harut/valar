import { fetchJson } from 'fetch-json';
class Super {
    static data = async () => {
        let superregld = await fetchJson.get("https://gateway.elrond.com/address/erd1qqqqqqqqqqqqqpgqdx6z3sauy49c5k6c6lwhjqclrfwlxlud2jpsvwj5dp/esdt");
        let egldusdc = await fetchJson.get("https://gateway.elrond.com/address/erd1qqqqqqqqqqqqqpgqeel2kumf0r8ffyhth7pqdujjat9nx0862jpsg2pqaq/esdt");

        let superr = superregld['data']['esdts']['SUPER-507aa6']['balance'].slice(0, -18);
        let egld = superregld['data']['esdts']['WEGLD-bd4d79']['balance'].slice(0, -18);
        let usdc = egldusdc['data']['esdts']['USDC-c76f1f']['balance'].slice(0, -6);
        let egld2 = egldusdc['data']['esdts']['WEGLD-bd4d79']['balance'].slice(0, -18);
        return { superr, egld, usdc, egld2 };
    }
    static index = async (req, res) => {
        let data = await this.data();
        let { superr, egld, usdc, egld2 } = data;
        res.render('super', { data: { RU: (egld / superr * usdc / egld2).toPrecision(4), RE: (egld / superr).toPrecision(8) }, layout: 'layouts/super' });
    }
    static transactionList = async (req, res) => {
        let list = await fetchJson.get("https://api.elrond.com/tokens/SUPER-507aa6/transactions?status=success&size=100");
        list = list.filter(function(item) {
            if (this.count < 20 && item.action.name=="swap" && item.action.description) {
              this.count++;
              return true;
            }
            return false;
          }, {count: 0});
        let { superr, egld ,usdc,egld2} = await this.data();
        let RU = (egld / superr * usdc / egld2).toPrecision(4);

        res.json({list,RU});
    }
    static getData = async (req, res) => {
        let data = await this.data();
        let { superr, egld, usdc, egld2 } = data;
        res.json({ RU: (egld / superr * usdc / egld2).toPrecision(4), RE: (egld / superr).toPrecision(6) })
    }
    static richList = async (req, res) => {
        let address = req.params.address;
        let data = await fetchJson.get("https://api.elrond.com/tokens/super/accounts?size=10000");

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

export { Super }