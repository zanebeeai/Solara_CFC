$(document).ready(function () {
    $.ajax({
        url: '/get_flux_data',
        type: 'GET',
        success: function (data) {
            if (!data.error) {
                var tableHtml = '<table>';
                for (var i = 0; i < data.length; i++) {
                    tableHtml += '<tr>';
                    for (var j = 0; j < data[i].length; j++) {
                        tableHtml += '<td>' + data[i][j] + '</td>';
                    }
                    tableHtml += '</tr>';
                }
                tableHtml += '</table>';
                $('#fluxData').html(tableHtml);
            } else {
                $('#fluxData').html('Table not found.');
            }
        },
        error: function () {
            $('#fluxData').html('Failed to retrieve data.');
        }
    });
});
