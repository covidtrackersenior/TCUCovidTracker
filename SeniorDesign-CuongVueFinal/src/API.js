import axios from 'axios';

export default {
    sss() {
        const url = 'https://raw.githubusercontent.com/BiKunTin/datastore/main/usa.json';
        const res = [];
        axios.get(url).then(resp => {
                const data = resp.data.features;
                data.map(item => {
                    console.log('stop');
                    const obj = {};
                    Object.keys(item).map(key => {
                        if (key !== 'geometry') {
                            obj[key] = item[key];
                        }
                        return [];
                    })
                    res.push(obj);
                    return [];
                });
            })
            .catch(err => console.log(err));

        console.log(res);
        return res;
    },
    async sk(a) {
        await a;
    },
    async converts(data1, data2) {
        console.log(data1);
        // console.log(data2);
        const destination = data2.features;
        console.log(destination);
        // const destination = destination1.features;
        // console.log(destination);
        const result = [];
        data1.map(item => {
            console.log('here');
            console.log(item);
            // destination.map(record => {
            //     console.log(record);
            //     if (record.id === item.id) {
            //         console.log(record.id);
            //         const newObj = item;
            //         newObj.geometry = record.geometry;
            //         result.push(newObj);
            //     }
            //     return [];
            // })
            console.log('ok');
            console.log(result);
            return result;
        })
        console.log("finish");
    }
};