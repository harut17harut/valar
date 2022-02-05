import { fetchJson } from 'fetch-json';
class Main {
    static main = async (req,res) => {
       
        res.render('main', { layout: 'layouts/main' });
    }
    
}

export { Main }