import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CPopover,
  CRow,
} from '@coreui/react';
import { cilPencil, cilSave, cilTrash, cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { EditEntityForm, useAuth, useEntity, useFormFields, useToast } from 'ucentral-libs';
import axiosInstance from 'utils/axiosInstance';
import DeleteEntityModal from 'components/DeleteEntityModal';

const initialForm = {
  name: {
    value: '',
    error: false,
    required: true,
  },
  description: {
    value: '',
    error: false,
  },
  notes: {
    value: [],
    error: false,
  },
};

const VenueInfoCard = () => {
  const { t } = useTranslation();
  const { entity, setEntity, refreshEntity } = useEntity();
  const { currentToken, endpoints } = useAuth();
  const { addToast } = useToast();
  const [fields, updateFieldWithId, updateField, setFormFields] = useFormFields(initialForm);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const toggleDelete = () => setShowDelete(!showDelete);

  const validation = () => {
    let success = true;

    for (const [key, field] of Object.entries(fields)) {
      if (field.required && field.value === '') {
        updateField(key, { error: true });
        success = false;
        break;
      }
    }

    return success;
  };

  const getVenueInfo = () => {
    setLoading(true);
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
    };

    axiosInstance
      .get(`${endpoints.owprov}/api/v1/venue/${entity.uuid}`, options)
      .then((response) => {
        const newFields = fields;
        for (const [key] of Object.entries(newFields)) {
          if (response.data[key] !== undefined) {
            newFields[key].value = response.data[key];
          }
        }
        setFormFields({ ...newFields });
      })
      .catch(() => {
        addToast({
          title: t('common.error'),
          body: t('inventory.error_get_venue'),
          color: 'danger',
          autohide: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleEditing = () => {
    if (editing) {
      getVenueInfo();
    }
    setEditing(!editing);
  };

  const editVenue = () => {
    if (validation()) {
      setLoading(true);
      const options = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${currentToken}`,
        },
      };

      const parameters = {
        uuid: entity.uuid,
        name: fields.name.value,
        description: fields.description.value,
      };

      axiosInstance
        .put(`${endpoints.owprov}/api/v1/venue/${entity.uuid}`, parameters, options)
        .then(() => {
          refreshEntity(entity.path, {
            name: fields.name.value,
          });

          setEntity({
            ...entity,
            ...{
              name: fields.name.value,
            },
          });

          addToast({
            title: t('common.success'),
            body: t('common.saved'),
            color: 'success',
            autohide: true,
          });
        })
        .catch(() => {
          addToast({
            title: t('common.error'),
            body: t('inventory.error_update_venue'),
            color: 'danger',
            autohide: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const addNote = (newNote) => {
    setLoading(true);

    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
    };

    const parameters = {
      uuid: entity.uuid,
      notes: [{ note: newNote }],
    };

    axiosInstance
      .put(`${endpoints.owprov}/api/v1/venue/${entity.uuid}`, parameters, options)
      .then(() => {
        getVenueInfo();
      })
      .catch(() => {
        addToast({
          title: t('common.error'),
          body: t('common.error_adding_note'),
          color: 'danger',
          autohide: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
    setLoading(false);
  };

  useEffect(() => {
    if (entity !== null) {
      setEditing(false);
      getVenueInfo();
    }
  }, [entity]);

  return (
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol sm="9">
            <CCardTitle>{entity?.name}</CCardTitle>
          </CCol>
          <CCol sm="3" className="text-right">
            <CPopover content={editing ? t('common.stop_editing') : t('common.edit')}>
              <CButton color="primary" variant="outline" onClick={toggleEditing}>
                <CIcon
                  name={editing ? 'cil-x' : 'cil-pencil'}
                  content={editing ? cilX : cilPencil}
                />
              </CButton>
            </CPopover>
            {'  '}
            <CPopover content={t('common.delete')}>
              <CButton color="primary" variant="outline" onClick={toggleDelete}>
                <CIcon name="cil-trash" content={cilTrash} />
              </CButton>
            </CPopover>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <EditEntityForm
          t={t}
          disable={loading}
          fields={fields}
          updateField={updateFieldWithId}
          addNote={addNote}
          editing={editing}
        />
        <CRow>
          <CCol className="mt-4 text-right" hidden={!editing}>
            <CPopover content={t('common.save')}>
              <CButton color="primary" variant="outline" onClick={editVenue}>
                <CIcon name="cil-save" content={cilSave} />
              </CButton>
            </CPopover>
          </CCol>
        </CRow>
      </CCardBody>
      <DeleteEntityModal show={showDelete} toggle={toggleDelete} />
    </CCard>
  );
};

export default VenueInfoCard;
