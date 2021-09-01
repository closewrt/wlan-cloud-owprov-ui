import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CRow, CCol } from '@coreui/react';
import { useEntity } from 'ucentral-libs';
import { useTranslation } from 'react-i18next';
import InventoryTable from 'components/InventoryTable';
import AddInventoryTagModal from 'components/AddInventoryTagModal';
import EntityInfoCard from 'components/EntityInfoCard';
import VenuesTable from 'components/VenuesTable';

const EntityPage = () => {
  const { t } = useTranslation();
  const { entity, setProviderEntity } = useEntity();
  const { entityId } = useParams();
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshId, setRefreshId] = useState(0);

  const refreshTable = () => setRefreshId(refreshId + 1);

  const toggleShowAdd = () => {
    setShowAddModal(!showAddModal);
  };

  useEffect(() => {
    if (entity === null || (entityId !== null && entity.uuid !== entityId)) {
      setProviderEntity(entityId, false);
    }
  }, [entityId]);

  return (
    <>
      <CRow>
        <CCol>{entity === null || entity.isVenue ? null : <EntityInfoCard />}</CCol>
      </CRow>
      <CRow>
        <CCol>
          {entity !== null && entity?.uuid !== '0000-0000-0000' && !entity.isVenue ? (
            <div>
              <VenuesTable
                entity={entity}
                toggleAdd={toggleShowAdd}
                refreshId={refreshId}
                refreshPageTables={refreshTable}
                onlyEntity
                title={t('entity.venues')}
              />
              <InventoryTable
                entity={entity}
                toggleAdd={toggleShowAdd}
                refreshId={refreshId}
                refreshPageTables={refreshTable}
                onlyEntity
                title={t('common.devices')}
              />
              <AddInventoryTagModal
                show={showAddModal}
                toggle={toggleShowAdd}
                refreshId={refreshId}
                entity={entity}
                refreshTable={refreshTable}
              />
            </div>
          ) : (
            <div />
          )}
        </CCol>
      </CRow>
    </>
  );
};

export default EntityPage;
