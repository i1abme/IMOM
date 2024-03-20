type orderTable = {
  title: string;
  content: string;
};

const OrderTable = ({ title, content }: orderTable) => {
  return (
    <table className="w-full">
      <tbody>
        <tr className="flex items-center">
          <td className="border flex justify-center py-5  border-white bg-main-color text-white w-[165px] whitespace-nowrap">
            {title}
          </td>
          <td className="border w-full py-5">{content}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderTable;
