import React, {useState, useEffect} from 'react'
import { Doughnut } from 'react-chartjs-2';

function ChartMessage({getAllMessages, colors}) {
    
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);

    async function fetchAllMessages() {
        const doc = await getAllMessages();
        createDatas(doc);
    }

    function createDatas(snapshot) {
        let res = new Map();
        let tmp_datas = {}
        let tmp_user_name = ""
        snapshot.forEach(function(doc) {
            tmp_datas = doc.data();
            tmp_user_name = tmp_datas['userName'];
            if(!res.get(tmp_user_name)) {
                res.set(tmp_user_name, 1);
            }
            else {
                let tmp = res.get(tmp_user_name);
                res.set(tmp_user_name, tmp+1);
            }
        });
        let labels_tmp = [];
        let data_tmp = [];
        res.forEach((value,key) => {
            data_tmp.push(value);
            labels_tmp.push(key);
        });
        setData(data_tmp);
        setLabels(labels_tmp);
    }

    useEffect(() => {
        fetchAllMessages();
    }, [])
      
    return (
        <div className="chart-message">
            <h2>Message per user</h2>
            <Doughnut data={{
                        labels: labels,
                        datasets: [{
                            data: data,
                            backgroundColor: colors,
                            hoverBackgroundColor: colors,
                        }]
                    }}
            />
        </div>
    )
}

export default ChartMessage;
