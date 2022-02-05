import { fetchJson } from 'fetch-json';
class Ride {
    static data = async () => {
        let rideegld = await fetchJson.get("https://gateway.elrond.com/address/erd1qqqqqqqqqqqqqpgqav09xenkuqsdyeyy5evqyhuusvu4gl3t2jpss57g8x/esdt");
        let egldusdc = await fetchJson.get("https://gateway.elrond.com/address/erd1qqqqqqqqqqqqqpgqeel2kumf0r8ffyhth7pqdujjat9nx0862jpsg2pqaq/esdt");

        let ride = rideegld['data']['esdts']['RIDE-7d18e9']['balance'].slice(0, -18);
        let egld = rideegld['data']['esdts']['WEGLD-bd4d79']['balance'].slice(0, -18);
        let usdc = egldusdc['data']['esdts']['USDC-c76f1f']['balance'].slice(0, -6);
        let egld2 = egldusdc['data']['esdts']['WEGLD-bd4d79']['balance'].slice(0, -18);
        console.log(ride);
        return { ride, egld, usdc, egld2 };
    }
    static index = async (req, res) => {
        let data = await this.data();
        let { ride, egld, usdc, egld2 } = data;
        res.render('ride', { data: { RU: (egld / ride * usdc / egld2).toPrecision(4), RE: (egld / ride).toPrecision(8) }, layout: 'layouts/ride' });
    }
    static transactionList = async (req, res) => {
        let list = await fetchJson.get("https://api.elrond.com/tokens/RIDE-7d18e9/transactions?status=success&size=100");
        list = list.filter(function(item) {
            if (this.count < 20 && item.action.name=="swap" && item.action.description) {
              this.count++;
              return true;
            }
            return false;
          }, {count: 0});
        let { ride, egld ,usdc,egld2} = await this.data();
        let RU = (egld / ride * usdc / egld2).toPrecision(4);

        res.json({list,RU});
    }
    static getData = async (req, res) => {
        let data = await this.data();
        let { ride, egld, usdc, egld2 } = data;
        res.json({ RU: (egld / ride * usdc / egld2).toPrecision(4), RE: (egld / ride).toPrecision(6) })
    }
    static richList = async (req, res) => {
        let address = req.params.address;
        let data = await fetchJson.get("https://api.elrond.com/tokens/ride/accounts?size=10000");

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

export { Ride }