


// event handler

// get the input

// fetch the json data from api

// build the plot with the api data 

function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
}

// add event handler
function handleSubmit() {
    // prevent the page from refreshing
    Plotly.d3.event.preventDefault();

    // select the input value from the form
    var stock = Plotly.d3.select("#inputdefault").node().value;
    console.log(stock)

    // clear the input value 
    Plotly.d3.select("#inputdefault").node().value = "";

    // build the plot 
    buildPlot(stock)
}

function buildPlot(stock) {
    var apiKey = "knMnRdxve7cL5MSFf39V"
    var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=2016-10-01&end_date=2018-02-09&api_key=${apiKey}`;

    Plotly.d3.json(url, function (error, response) {
        console.log(response)
        if (error) return console.warn(error);

        var name = response.dataset.name;
        var stock = response.dataset.dataset_code;
        var startDate = response.dataset.start_date;
        var endDate = response.dataset.end_date;
        var dates = unpack(response.dataset.data, 0);
        var closingPrices = unpack(response.dataset.data, 4);

        // candle stick
        var openingPrices = unpack(response.dataset.data, 1);
        var highPrices = unpack(response.dataset.data, 2);
        var lowPrices = unpack(response.dataset.data, 3);

        var trace1 = {
            name: name,
            mode: "lines",
            x: dates,
            y: closingPrices,
            type: "scatter",
            line: {
                color: "#17BECF"
            }
        }

        // Candlestick Trace
        var trace2 = {
            type: "candlestick",
            x: dates,
            high: highPrices,
            low: lowPrices,
            open: openingPrices,
            close: closingPrices
        };

        var data = [trace1, trace2]

        var layout = {
            title: `${stock} Price Chart for last one year`,
            xaxis: {
                range: [startDate, endDate],
                type: "date"
            },
            yaxis: {
                autorange: true,
                type: "linear"
            }
        }

        Plotly.newPlot("plot", data, layout)
    });
}

Plotly.d3.select("#submit").on("click", handleSubmit)