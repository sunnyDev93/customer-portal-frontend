export const getCustomerByAccountNumber = async (accountNumber: string) => {
  if (accountNumber === '123456789') {
    return {
      status: 'success',
      data: {
        officeID: '1',
        email: 'filipe.perina@goaptive.com',
        id: '2550175',
        name: 'Filipe Perina',
        first_name: 'Filipe',
        last_name: 'Perina',
        phone_number: '4078004889',
        status_name: 'Active',
        office_id: 1,
        is_phone_number_valid: true,
        is_email_valid: true,
      },
    };
  } else {
    return {
      status: 404,
      data: {},
    };
  }
};
