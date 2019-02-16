import XLSX from 'xlsx';
import FileSaver from 'file-saver';

export const exportExcel = ({
  items = [],
  headers = [],
  sheetName = 'sheet',
  fileName = 'data.xlsx',
}) => {
  const worksheet = XLSX.utils.json_to_sheet(items, { header: headers });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
  const wbout = XLSX.write(workbook, wopts);
  const s2ab = s => {
    const view = new Uint8Array(s.length); // eslint-disable-line
    const newbuf = view.map((i, index) => s.charCodeAt(index) & 0xff);
    return newbuf;
  };
  FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), fileName);
};
