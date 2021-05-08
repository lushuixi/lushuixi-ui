

export function defaultRenderCell(h, {row, column, $index}) {

    const property = column.property;

    const value = property && row[property];

    // console.log('defaultRenderCell', row, column, $index, value)

    return value;
}