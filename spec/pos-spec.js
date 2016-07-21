'use strict';

describe("separateTags",function () {
    it("should separate tags",function () {
        let tags = ['IEM0000000','IEM0000003-2'];
        let result = separateTags(tags);
        let itemsTag = [
            {
                barcode:'IEM0000000',
                count:1
            },
            {
                barcode:'IEM0000003',
                count:2
            }
        ];
        expect(result).toEqual(itemsTag);
    })
});

describe("amountBarcodes",function () {
    it("should amount the items barcodes",function () {
        let tags = [{barcode:'IEM0000000',count:1},{barcode:'IEM0000003',count:2},{barcode:'IEM0000003',count:2}];
        let result = amountBarcodes(tags);
        let itemsCount = [
            {
                barcode:'IEM0000000',
                count:1
            },
            {
                barcode:'IEM0000003',
                count:4
            }
        ];
        expect(result).toEqual(itemsCount);
    })
});

describe("matchPromotions",function(){
    it("match the item's promotion type",function(){
        let itemsCount = [
            {
                "barcode": "ITEM000001",
                "count": 1
            },
            {
                "barcode": "ITEM000003",
                "count": 2.5
            },
            {
                "barcode": "ITEM000005",
                "count": 3
            }
        ];
        let allPromoteItems =  [
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcodes: [
                    'ITEM000000',
                    'ITEM000001',
                    'ITEM000005'
                ]
            }
        ];
        let result = matchPromotions(itemsCount,allPromoteItems);

        expect(result).toEqual([
            {
                "barcode": "ITEM000001",
                "count": 1,
                "type": "BUY_TWO_GET_ONE_FREE"
            },
            {
                "barcode": "ITEM000003",
                "count": 2.5,
                "type": "1"
            },
            {
                "barcode": "ITEM000005",
                "count": 3,
                "type": "BUY_TWO_GET_ONE_FREE"
            }
        ]);
    })
});

describe("matchItems",function(){
    it("match items message",function(){
        let  itemsPromotionList =[
            {
                "barcode": "ITEM000001",
                "count": 1,
                "type": "BUY_TWO_GET_ONE_FREE"
            },
            {
                "barcode": "ITEM000003",
                "count": 2.5,
                "type": "1"
            }
        ];
        let allItems = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00
            },
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
            },
            {
                barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2.00
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
            }
        ];

        let result = matchItems(itemsPromotionList,allItems);
        expect(result).toEqual([
            {
                "barcode": "ITEM000001",
                "name": "雪碧",
                "unit": "瓶",
                "price": 3,
                "count": 1,
                "type": "BUY_TWO_GET_ONE_FREE"
            },
            {
                "barcode": "ITEM000003",
                "name": "荔枝",
                "unit": "斤",
                "price": 15,
                "count": 2.5,
                "type": "1"
            }
        ]);

    })
});

describe("calculateSubtotal",function(){
    it("calculate items subtotal", function(){
        let itemsList = [
            {
                "barcode": "ITEM000001",
                "name": "雪碧",
                "unit": "瓶",
                "price": 3,
                "count": 5,
                "type": "BUY_TWO_GET_ONE_FREE"
            },
            {
                "barcode": "ITEM000003",
                "name": "荔枝",
                "unit": "斤",
                "price": 15,
                "count": 2.5,
                "type": "1"
            },
            {
                "barcode": "ITEM000005",
                "name": "方便面",
                "unit": "袋",
                "price": 4.5,
                "count": 3,
                "type": "BUY_TWO_GET_ONE_FREE"
            }

        ];

        let result = calculateSubtotal(itemsList);
        expect(result).toEqual( [

            {
                "barcode": "ITEM000001",
                "name": "雪碧",
                "unit": "瓶",
                "price": 3,
                "count": 5,
                "type": "BUY_TWO_GET_ONE_FREE",
                "subtotal": 15
            },
            {
                "barcode": "ITEM000003",
                "name": "荔枝",
                "unit": "斤",
                "price": 15,
                "count": 2.5,
                "type": "1",
                "subtotal": 37.5
            },
            {
                "barcode": "ITEM000005",
                "name": "方便面",
                "unit": "袋",
                "price": 4.5,
                "count": 3,
                "type": "BUY_TWO_GET_ONE_FREE",
                "subtotal": 13.5
            }
        ]);
    })

});

describe("calculateSavedSubtotal",function(){
    it("calculate items have been saved subtotal", function(){
        let itemsList = [

            {
                "barcode": "ITEM000001",
                "name": "雪碧",
                "unit": "瓶",
                "price": 3,
                "count": 5,
                "type": "BUY_TWO_GET_ONE_FREE"
            },
            {
                "barcode": "ITEM000003",
                "name": "荔枝",
                "unit": "斤",
                "price": 15,
                "count": 2.5,
                "type": "1"
            },
            {
                "barcode": "ITEM000005",
                "name": "方便面",
                "unit": "袋",
                "price": 4.5,
                "count": 3,
                "type": "BUY_TWO_GET_ONE_FREE"
            }

        ];

        let result = calculateSavedSubtotal(itemsList);
        expect(result).toEqual( [

            {
                "barcode": "ITEM000001",
                "name": "雪碧",
                "unit": "瓶",
                "price": 3,
                "count": 5,
                "type": "BUY_TWO_GET_ONE_FREE",
                "discountSubtotal": 12
            },
            {
                "barcode": "ITEM000003",
                "name": "荔枝",
                "unit": "斤",
                "price": 15,
                "count": 2.5,
                "type": "1",
                "discountSubtotal": 37.5
            },
            {
                "barcode": "ITEM000005",
                "name": "方便面",
                "unit": "袋",
                "price": 4.5,
                "count": 3,
                "type": "BUY_TWO_GET_ONE_FREE",
                "discountSubtotal": 9
            }
        ]);
    })

});

describe("calculateTotal",function(){
    it("calculate total", function() {
        let itemsDiscountSubtotal = [

            {
                "barcode": "ITEM000001",
                "name": "雪碧",
                "unit": "瓶",
                "price": 3,
                "count": 5,
                "type": "BUY_TWO_GET_ONE_FREE",
                "discountSubtotal": 12
            },
            {
                "barcode": "ITEM000003",
                "name": "荔枝",
                "unit": "斤",
                "price": 15,
                "count": 2.5,
                "type": "1",
                "discountSubtotal": 37.5
            },
            {
                "barcode": "ITEM000005",
                "name": "方便面",
                "unit": "袋",
                "price": 4.5,
                "count": 3,
                "type": "BUY_TWO_GET_ONE_FREE",
                "discountSubtotal": 9
            }

        ];

        let result = calculateTotal(itemsDiscountSubtotal);
        expect(result).toEqual(58.5);
    })

});

describe("getDiscount",function(){
    it("get the sum of discount", function(){
        let itemSubtotal = [
            {
                "barcode": "ITEM000001",
                "name": "雪碧",
                "unit": "瓶",
                "price": 3,
                "count": 5,
                "type": "BUY_TWO_GET_ONE_FREE",
                "subtotal": 15
            },
            {
                "barcode": "ITEM000003",
                "name": "荔枝",
                "unit": "斤",
                "price": 15,
                "count": 2.5,
                "type": "1",
                "subtotal": 37.5
            },
            {
                "barcode": "ITEM000005",
                "name": "方便面",
                "unit": "袋",
                "price": 4.5,
                "count": 3,
                "type": "BUY_TWO_GET_ONE_FREE",
                "subtotal": 13.5
            }
        ];
        let itemsDiscountSubtotal = [

            {
                "barcode": "ITEM000001",
                "name": "雪碧",
                "unit": "瓶",
                "price": 3,
                "count": 5,
                "type": "BUY_TWO_GET_ONE_FREE",
                "discountSubtotal": 12
            },
            {
                "barcode": "ITEM000003",
                "name": "荔枝",
                "unit": "斤",
                "price": 15,
                "count": 2.5,
                "type": "1",
                "discountSubtotal": 37.5
            },
            {
                "barcode": "ITEM000005",
                "name": "方便面",
                "unit": "袋",
                "price": 4.5,
                "count": 3,
                "type": "BUY_TWO_GET_ONE_FREE",
                "discountSubtotal": 9
            }
        ];
        let result = getDiscount(itemSubtotal,itemsDiscountSubtotal);
        expect(result).toEqual(7.5);
    })

});


describe("print", function() {
    it("should print text", function()  {
        const tags = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2.5',
            'ITEM000005',
            'ITEM000005-2',
        ];
        spyOn(console, 'log');
        printReceipt(tags);
        const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});
