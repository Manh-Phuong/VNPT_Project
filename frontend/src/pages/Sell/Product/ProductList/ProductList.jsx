import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import numeral from 'numeral';
import moment from 'moment';

import { AuthContext } from '../../../../contexts/AuthContext';
import * as ProductServices from '../../../../services/productService';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

// const columns = [
//     { field: 'customerCode', headerName: 'Mã khách hàng', width: 153 },
//     { field: 'clientName', headerName: 'Tên khách hàng', width: 264 },
//     { field: 'numberPhone', headerName: 'Số điện thoại', width: 160 },
//     { field: 'customerGroup', headerName: 'Nhóm khách hàng', width: 191 },
//     { field: 'totalSpending', headerName: 'Tổng chi tiêu', width: 191 },
//     { field: 'totalOrder', headerName: 'Tổng SL đơn hàng', width: 160 },
// ];

const columns = [
    {
        field: 'productCode',
        width: 153,
        filterable: false,
        headerClassName: 'super-app-theme--header',
        cellClassName: 'super-app-theme--cell order-id',
        headerAlign: 'center',
        renderHeader: () => <span>Mã sản phẩm</span>,
    },
    {
        field: 'productName',
        width: 430,
        filterable: false,
        headerClassName: 'super-app-theme--header',
        cellClassName: 'super-app-theme--cell order-id',
        headerAlign: 'center',
        renderHeader: () => <span>Tên sản phẩm</span>,
    },
    {
        field: 'productPrice',
        width: 160,
        filterable: false,
        headerClassName: 'super-app-theme--header',
        cellClassName: 'super-app-theme--cell order-id',
        headerAlign: 'center',
        renderHeader: () => <span>Giá</span>,
    },
    {
        field: 'productQuantity',
        width: 191,
        filterable: false,
        headerClassName: 'super-app-theme--header',
        cellClassName: 'super-app-theme--cell order-id',
        headerAlign: 'center',
        renderHeader: () => <span>Kho hàng</span>,
    },
    {
        field: 'productTime',
        width: 230,
        filterable: false,
        headerClassName: 'super-app-theme--header',
        cellClassName: 'super-app-theme--cell order-id',
        headerAlign: 'center',
        renderHeader: () => <span>Ngày tạo</span>,
    },
];

function ProductList() {
    const [buttonAllResponse, setButtonAllResponse] = useState(true);
    const navigate = useNavigate();
    // const { token } = useContext(AuthContext);
    const token = useSelector((state) => state.auth.token);
    const [inputSearchCustomer, setInputSearchCustomer] = useState('');
    const [rows, setRows] = useState([]);
    // const [rows, setRows] = useState([
    //     {
    //         id: 1,
    //         productCode: 'POZ000001',
    //         productName: 'Áo đẹp',
    //         productPrice: '100,000',
    //         productQuantity: 99,
    //         productTime: '12-09-2023',
    //     },
    //     {
    //         id: 2,
    //         productCode: 'POZ000002',
    //         productName: 'Túi đẹp',
    //         productPrice: '100,000',
    //         productQuantity: 99,
    //         productTime: '12-09-2023',
    //     },
    //     {
    //         id: 3,
    //         productCode: 'POZ000003',
    //         productName: 'Quần đẹp',
    //         productPrice: '100,000',
    //         productQuantity: 99,
    //         productTime: '12-09-2023',
    //     },
    //     {
    //         id: 4,
    //         productCode: 'POZ000004',
    //         productName: 'Giày đẹp',
    //         productPrice: '100,000',
    //         productQuantity: 99,
    //         productTime: '12-09-2023',
    //     },
    //     {
    //         id: 5,
    //         productCode: 'POZ000005',
    //         productName: 'Balo đẹp',
    //         productPrice: '100,000',
    //         productQuantity: 99,
    //         productTime: '12-09-2023',
    //     },
    //     {
    //         id: 6,
    //         productCode: 'POZ000006',
    //         productName: 'Mũ đẹp',
    //         productPrice: '100,000',
    //         productQuantity: 99,
    //         productTime: '12-09-2023',
    //     },
    // ]);
    const [totalItems, setTotalItems] = useState();
    const [totalPages, setTotalPages] = useState();

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const handleRowClick = (params) => {
        // alert(`Bạn đã nhấp vào hàng có ID: ${params.row.id}`);
        console.log(params.row);
        navigate(`/sell_product/detail/${params.row.id}`);
    };

    const handleInputSearchChange = (e) => {
        setInputSearchCustomer(e.target.value);
    };

    const fetchApi = async (paginationModel) => {
        try {
            const res = await ProductServices.getListProductByUser(paginationModel, token);
            console.log(res?.data);
            setRows(
                res?.data?.map((item) => {
                    return {
                        id: item.id,
                        productCode: item?.id,
                        productName: item?.name,
                        productPrice: item?.priceBase,
                        productQuantity: 99,
                        productTime:
                            moment(item?.updateAt).format('DD/MM/YYYY') || moment(item?.createAt).format('DD/MM/YYYY'),
                    };
                }),
            );
            setTotalItems(res.totalItems);
            setTotalPages(res.totalPages);
        } catch (error) {
            console.log('fetchApi getAllCustomerServices Sidebar.js' + error);
        }
    };

    useEffect(() => {
        // fetchApi(paginationModel);
    }, []);

    useEffect(() => {
        // fetchApi(paginationModel);
    }, [paginationModel.page, paginationModel.pageSize]);

    return (
        <div className={cx('wrap')}>
            <div className={cx('buttonAddNewCustomer')}>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/sell_product/create')}>
                    Tạo sản phẩm
                </Button>
            </div>
            <div className={cx('header')}>
                <div className={cx('headerTitle')}>
                    <button className={cx({ active: buttonAllResponse })}>Tất cả sản phẩm</button>
                </div>
                <div className={cx('headerSearch')}>
                    <div className={cx('inputSearch')}>
                        <SearchIcon className={cx('iconSearch')} />
                        <input
                            placeholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm"
                            value={inputSearchCustomer}
                            onChange={handleInputSearchChange}
                        ></input>
                    </div>
                </div>
            </div>
            <div className={cx('table')}>
                <div style={{ width: '100%', textAlign: 'center !important' }}>
                    <Box
                        sx={{
                            height: 'fit-content',
                            width: '100%',
                            '& .super-app-theme--cell': {
                                display: 'flex !important',
                                justifyContent: 'center !important',
                            },
                            '& .order-id': {
                                cursor: 'pointer',
                            },
                            '& .order-id:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={6}
                            className={cx('dataGrid')}
                            onRowClick={handleRowClick}
                            rowCount={totalItems}
                            pageSizeOptions={[10, 50, 100]}
                            paginationModel={paginationModel}
                            paginationMode="server"
                            onPaginationModelChange={setPaginationModel}
                            sx={{ border: 'none', padding: '0 16px' }}
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
