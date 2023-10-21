import { useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IAuth } from '../../types/forms';


// import { showToastMsg } from '../../../common/showToastMsg';

// import { addDefaultSettingsIfNotExistsAPI } from '../../../db/API/settings';

const useSignUpForm = () => {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState<boolean>(false);
  const methods = useForm<IAuth>();
  const { handleSubmit } = methods;

  const onError: SubmitErrorHandler<IAuth> = (errors, e) => {
    return console.log(errors);
  };

  const onSubmit: SubmitHandler<IAuth> = ({ email, password }) => {
    // const auth = getAuth();
   
  };

  return { redirect, methods, handleSubmit, onSubmit,  onError };
};

export default useSignUpForm;