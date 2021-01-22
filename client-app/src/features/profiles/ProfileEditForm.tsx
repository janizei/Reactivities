import { observer } from "mobx-react-lite";
import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form } from "semantic-ui-react";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import TextInput from "../../app/common/form/TextInput";
import { IProfile } from "../../app/models/profile";

const validate = combineValidators({
  displayName: isRequired("displayName"),
});

interface IProps {
  updateProfile: (profile: IProfile) => void;
  profile: IProfile;
}

const ProfileEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
  return (
    <FinalForm
      onSubmit={updateProfile}
      validate={validate}
      initialValues={profile!}
      render={({ handleSubmit, invalid, pristine, submitting }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Display Name"
          />
          <Field
            name="bio"
            placeholder="Bio"
            rows={3}
            value={profile!.bio}
            component={TextAreaInput}
          />
          <Button
            loading={submitting}
            disabled={invalid || pristine}
            floated="right"
            positive
            content="Update profile"
          />
        </Form>
      )}
    />
  );
};

export default observer(ProfileEditForm);