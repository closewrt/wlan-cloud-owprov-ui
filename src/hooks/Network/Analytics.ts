import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { axiosAnalytics } from 'utils/axiosInstances';

export const useGetAnalyticsBoard = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const toast = useToast();

  return useQuery(['get-board', id], () => axiosAnalytics.get(`board/${id}`).then(({ data }) => data), {
    enabled: id !== null,
    onError: (e: AxiosError) => {
      if (!toast.isActive('board-fetching-error'))
        toast({
          id: 'board-fetching-error',
          title: t('common.error'),
          description: t('crud.error_fetching_obj', {
            obj: t('analytics.board'),
            e: e?.response?.data?.ErrorDescription,
          }),
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
    },
  });
};

export const useGetAnalyticsBoardDevices = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const toast = useToast();

  return useQuery(
    ['get-board-devices', id],
    () => axiosAnalytics.get(`board/${id}/devices`).then(({ data }) => data.devices),
    {
      enabled: id !== null,
      onError: (e: AxiosError) => {
        if (!toast.isActive('board-fetching-error'))
          toast({
            id: 'board-fetching-error',
            title: t('common.error'),
            description: t('crud.error_fetching_obj', {
              obj: t('analytics.board'),
              e: e?.response?.data?.ErrorDescription,
            }),
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
      },
    },
  );
};

export const useGetAnalyticsBoardTimepoints = ({
  id,
  startTime,
  endTime,
  enabled = true,
}: {
  id: string;
  startTime: Date;
  endTime?: Date;
  enabled?: boolean;
}) => {
  const { t } = useTranslation();
  const toast = useToast();

  return useQuery(
    ['get-board-timepoints', id],
    () =>
      axiosAnalytics
        .get(
          `board/${id}/timepoints?fromDate=${Math.floor(startTime.getTime() / 1000)}${
            endTime ? `&endDate=${Math.floor(endTime.getTime() / 1000)}` : ''
          }`,
        )
        .then(({ data }) => data.points),
    {
      enabled: id !== null && enabled,
      onError: (e: AxiosError) => {
        if (!toast.isActive('board-fetching-error'))
          toast({
            id: 'board-fetching-error',
            title: t('common.error'),
            description: t('crud.error_fetching_obj', {
              obj: t('analytics.board'),
              e: e?.response?.data?.ErrorDescription,
            }),
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
      },
    },
  );
};

export const useCreateAnalyticsBoard = () => useMutation((newBoard) => axiosAnalytics.post('board/0', newBoard));

export const useUpdateAnalyticsBoard = () =>
  useMutation((newBoard: { id: string }) => axiosAnalytics.put(`board/${newBoard.id}`, newBoard));

export const useDeleteAnalyticsBoard = () => useMutation((id) => axiosAnalytics.delete(`board/${id}`, {}));