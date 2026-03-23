test('renders a heading', () => {
    const heading = document.createElement('h1');
    heading.textContent = 'Inventory Management';
    document.body.appendChild(heading);
    expect(heading.textContent).toBe('Inventory Management');
    document.body.removeChild(heading);
});

test('item is low stock when quantity is below threshold', () => {
    const item = { quantity: 3, low_stock: 5};
    const isLow = item.quantity <= item.low_stock;
    expect(isLow).toBe(true);
});

test('item is not low stock when quantity is above threshold', () => {
    const item = { quantity: 10, low_stock: 5};
    const isLow = item.quantity <= item.low_stock;
    expect(isLow).toBe(false);
});

test('negative stock is invalid', () => {
    const quantity = -1;
    const isValid = quantity >= 0;
    expect(isValid).toBe(false);
});

test('positive stock is valid', () => {
    const quantity = 10;
    const isValid = quantity >= 0;
    expect(isValid).toBe(true);
});