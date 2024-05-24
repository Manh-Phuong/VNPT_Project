import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Form, Radio, Space, Switch, Table } from 'antd';
const columns = [
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
        render: (text, record) => (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <img src={record.image} alt={record.name} style={{ maxWidth: '50px' }} />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <div>
                        <div>Đồ Lv</div>
                        <div>Phân loại: XL</div>
                    </div>
                    <div>x1</div>
                </div>
            </div>
        ),
    },
    {
        title: 'Tổng đơn hàng',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
        render: (text, record) => (
            <div style={{ width: '100px' }}>
                <div style={{ textAlign: 'left', fontWeight: '600' }}>{record.price} vnd</div>
                <div>{record.status_payment}</div>
            </div>
        ),
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        filters: [
            {
                text: 'Chờ xác nhận',
                value: '1',
            },
            {
                text: 'Chờ lấy hàng',
                value: '2',
            },
            {
                text: 'Chờ giao hàng',
                value: '3',
            },
            {
                text: 'Đã giao hàng',
                value: '4',
            },
            {
                text: 'Đang giao hàng',
                value: '5',
            },
            {
                text: 'Đã hủy',
                value: '6',
            },
        ],
        onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
        title: 'Thời gian đặt',
        dataIndex: 'time_order',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Vận chuyển',
        dataIndex: 'delivery',
        filters: [
            {
                text: 'J&T Express',
                value: 'London',
            },
            {
                text: 'GHN VN',
                value: 'New York',
            },
        ],
        onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
        title: 'Thao tác',
        dataIndex: 'action',
    },
];
const data = [];
for (let i = 1; i <= 10; i++) {
    data.push({
        key: i,
        name: 'John Brown',
        image: 'https://th.bing.com/th/id/OIP.srMYpYBry0q9k5anB_1hKAHaHa?rs=1&pid=ImgDetMain',
        price: Number(`${i}2`),
        status_payment: 'Thanh toán khi nhận hàng',
        status: 'Chờ lấy hàng',
        time_order: '23 12 2022',
        delivery: 'J&T Express',
        action: 'Chuẩn bị hàng',
        description: `User ${i}`,
    });
}
const defaultExpandable = {
    expandedRowRender: (record) => <p>{record.description}</p>,
};
const defaultTitle = () => 'Here is title';
const defaultFooter = () => 'Here is footer';
const TableOrder = () => {
    const [bordered, setBordered] = useState(true);
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState('large');
    const [expandable, setExpandable] = useState(defaultExpandable);
    const [showTitle, setShowTitle] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [showFooter, setShowFooter] = useState(false);
    const [rowSelection, setRowSelection] = useState({});
    const [hasData, setHasData] = useState(true);
    const [tableLayout, setTableLayout] = useState();
    const [top, setTop] = useState('none');
    const [bottom, setBottom] = useState('bottomRight');
    const [ellipsis, setEllipsis] = useState(false);
    const [yScroll, setYScroll] = useState(false);
    const [xScroll, setXScroll] = useState();
    const handleBorderChange = (enable) => {
        setBordered(enable);
    };
    const handleLoadingChange = (enable) => {
        setLoading(enable);
    };
    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };
    const handleTableLayoutChange = (e) => {
        setTableLayout(e.target.value);
    };
    const handleExpandChange = (enable) => {
        setExpandable(enable ? defaultExpandable : undefined);
    };
    const handleEllipsisChange = (enable) => {
        setEllipsis(enable);
    };
    const handleTitleChange = (enable) => {
        setShowTitle(enable);
    };
    const handleHeaderChange = (enable) => {
        setShowHeader(enable);
    };
    const handleFooterChange = (enable) => {
        setShowFooter(enable);
    };
    const handleRowSelectionChange = (enable) => {
        setRowSelection(enable ? {} : undefined);
    };
    const handleYScrollChange = (enable) => {
        setYScroll(enable);
    };
    const handleXScrollChange = (e) => {
        setXScroll(e.target.value);
    };
    const handleDataChange = (newHasData) => {
        setHasData(newHasData);
    };
    const scroll = {};
    if (yScroll) {
        scroll.y = 240;
    }
    if (xScroll) {
        scroll.x = '100vw';
    }
    const tableColumns = columns.map((item) => ({
        ...item,
        ellipsis,
    }));
    if (xScroll === 'fixed') {
        tableColumns[0].fixed = true;
        tableColumns[tableColumns.length - 1].fixed = 'right';
    }
    const tableProps = {
        bordered,
        loading,
        size,
        expandable,
        title: showTitle ? defaultTitle : undefined,
        showHeader,
        footer: showFooter ? defaultFooter : undefined,
        rowSelection,
        scroll,
        tableLayout,
    };
    return (
        <>
            {/* <Form
                layout="inline"
                className="components-table-demo-control-bar"
                style={{
                    marginBottom: 16,
                }}
            >
                <Form.Item label="Bordered">
                    <Switch checked={bordered} onChange={handleBorderChange} />
                </Form.Item>
                <Form.Item label="loading">
                    <Switch checked={loading} onChange={handleLoadingChange} />
                </Form.Item>
                <Form.Item label="Title">
                    <Switch checked={showTitle} onChange={handleTitleChange} />
                </Form.Item>
                <Form.Item label="Column Header">
                    <Switch checked={showHeader} onChange={handleHeaderChange} />
                </Form.Item>
                <Form.Item label="Footer">
                    <Switch checked={showFooter} onChange={handleFooterChange} />
                </Form.Item>
                <Form.Item label="Expandable">
                    <Switch checked={!!expandable} onChange={handleExpandChange} />
                </Form.Item>
                <Form.Item label="Checkbox">
                    <Switch checked={!!rowSelection} onChange={handleRowSelectionChange} />
                </Form.Item>
                <Form.Item label="Fixed Header">
                    <Switch checked={!!yScroll} onChange={handleYScrollChange} />
                </Form.Item>
                <Form.Item label="Has Data">
                    <Switch checked={!!hasData} onChange={handleDataChange} />
                </Form.Item>
                <Form.Item label="Ellipsis">
                    <Switch checked={!!ellipsis} onChange={handleEllipsisChange} />
                </Form.Item>
                <Form.Item label="Size">
                    <Radio.Group value={size} onChange={handleSizeChange}>
                        <Radio.Button value="large">Large</Radio.Button>
                        <Radio.Button value="middle">Middle</Radio.Button>
                        <Radio.Button value="small">Small</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Table Scroll">
                    <Radio.Group value={xScroll} onChange={handleXScrollChange}>
                        <Radio.Button value={undefined}>Unset</Radio.Button>
                        <Radio.Button value="scroll">Scroll</Radio.Button>
                        <Radio.Button value="fixed">Fixed Columns</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Table Layout">
                    <Radio.Group value={tableLayout} onChange={handleTableLayoutChange}>
                        <Radio.Button value={undefined}>Unset</Radio.Button>
                        <Radio.Button value="fixed">Fixed</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Pagination Top">
                    <Radio.Group
                        value={top}
                        onChange={(e) => {
                            setTop(e.target.value);
                        }}
                    >
                        <Radio.Button value="topLeft">TopLeft</Radio.Button>
                        <Radio.Button value="topCenter">TopCenter</Radio.Button>
                        <Radio.Button value="topRight">TopRight</Radio.Button>
                        <Radio.Button value="none">None</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Pagination Bottom">
                    <Radio.Group
                        value={bottom}
                        onChange={(e) => {
                            setBottom(e.target.value);
                        }}
                    >
                        <Radio.Button value="bottomLeft">BottomLeft</Radio.Button>
                        <Radio.Button value="bottomCenter">BottomCenter</Radio.Button>
                        <Radio.Button value="bottomRight">BottomRight</Radio.Button>
                        <Radio.Button value="none">None</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form> */}
            <Table
                {...tableProps}
                pagination={{
                    position: [top, bottom],
                }}
                columns={tableColumns}
                dataSource={hasData ? data : []}
                scroll={scroll}
            />
        </>
    );
};
export default TableOrder;
