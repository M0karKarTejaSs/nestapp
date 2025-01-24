export const downloadCSV = (title, columns, data) => {
    const headers = columns.map(({ header }) => header);
    const rows = data.map((row) =>
        columns.map(({ accessor }) => row[accessor] !== undefined ? row[accessor] : '-')
    );

    const csvContent = [
        headers.join(','), // Header row
        ...rows.map((row) => row.join(',')), // Data rows
    ]
        .map((row) => row.replace(/\n/g, ' ')) // Replace line breaks in data
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.csv`; // Name of the file
    link.click();
};
