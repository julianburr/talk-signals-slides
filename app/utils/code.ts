export function formatCode(code: string) {
  let rows = code.split('\n');
  const firstRow = rows.find((row) => !!row.trim());
  if (!firstRow) {
    return '';
  }

  rows = rows.slice(rows.indexOf(firstRow));

  const leadingWhitespace = firstRow.match(/^\s*/)?.[0] || '';
  const formattedRows = rows.map((row) => row.substring(leadingWhitespace.length));
  return formattedRows.join('\n');
}
