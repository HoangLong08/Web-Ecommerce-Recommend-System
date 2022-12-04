import React from 'react'
import { Table as TableAntd } from 'antd';

function Table({ data, tableHead, loading }) {
	return (
		<TableAntd dataSource={data} columns={tableHead} loading={loading} />
	)
}

export default Table