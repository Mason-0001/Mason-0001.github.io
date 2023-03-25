const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);

//   Create variables for use in later charts and tables

const idName = data.samples.map(sample => sample.id);


// Attach the onchange event to the parent element of the select element
document.addEventListener('change', function(event) {
    if (event.target && event.target.id === 'selDataset') {
      optionChanged(event.target.value);
    }
  });
  
  // Generate options for the dropdown menu
  var dropdown = d3.select("#selDataset");
  idName.forEach(function(id) {
      dropdown.append("option").text(id).property("value", id);
  });
  
  // Define the callback function for when the dropdown menu changes
  function optionChanged(id) {
      // Update the chart and metadata display based on the selected ID
      // Select the sample-metadata div and clear any existing content
      console.log('Selected ID:', id);
      var metaTable = d3.select("#sample-metadata").html("");
      console.log('metaTable:', metaTable);
      // Get the metadata for the selected ID
      var metaData = data.metadata.find(data => data.id == id);
      console.log('metaData:', metaData);

      // Loop through the metadata object and append rows to the table
      Object.entries(metaData).forEach(([key, value]) => {
          var row = metaTable.append("tr");
          row.append("td").text(`${key}:`);
          row.append("td").text(value);
      });

    //   Create bar chart
      // Update the bar chart data
  var sampleData = data.samples.find(data => data.id == id);
  var trace1 = {
    x: sampleData.sample_values.slice(0, 10),
    y: sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`),
    text: sampleData.otu_labels.slice(0, 10),
    type: "bar",
    orientation: "h"
  };
  var layout = {
    title: "Top 10 OTUs",
    xaxis: {
      title: "Sample Values"
    },
    yaxis: {
      autorange: 'reversed'
    }
  };
  Plotly.newPlot("bar", [trace1], layout);
  
    // Create colorScale for bubble chart
    const colorScale = [[0, 'purple'],
    [0.25, 'blue'],
    [0.5, 'lightblue'],
    [0.75, 'green'],
    [1, 'brown']
    ];
// create variables for bubble chart

    var sampleValues1 = sampleData.sample_values;
    var otuLabels = sampleData.otu_labels;
    var idsPlain1 = sampleData.otu_ids;

// Create bubble chart
    const trace2 = {
        x: idsPlain1,
        y: sampleValues1,
        text: otuLabels,
        mode: "markers",
        marker: {size: sampleValues1, color: idsPlain1, colorscale: colorScale, sizeref: 1.5}
    }
    const layout2 = {
        xaxis: {
        title: "OTU ID"
        },
        yaxis: {
        title: "Sample Values"
        }
    };

  Plotly.newPlot("bubble", [trace2], layout2);
  
  
//   Create simple gauge

  var sampleData = data.metadata.find(data => data.id == id);
  var washings = sampleData.wfreq;
  console.log(washings)
  var gaugeData = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: washings,
      title: { text: "Belly Button Washing Frequency", font: { size: 20 } },
      gauge: {
        axis: { range: [null, 12], tickwidth: 1, tickcolor: "black" },
        bar: { color: "black" },
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 2], color: "grey" },
          { range: [2, 4], color: "darkgrey" },
          { range: [4, 6], color: "lightgrey" },
          { range: [6, 8], color: "lightgreen" },
          { range: [8, 10], color: "green" },
          { range: [10, 12], color: "darkgreen" }
        ],
      }
    }
  ];
  
  var layout3 = {
    margin: { t: 25, r: 25, l: 25, b: 25 },
    font: { color: "darkblue", family: "Arial" },
  };
  
  Plotly.newPlot('gauge', gaugeData, layout3);
}

});
