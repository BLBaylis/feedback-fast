import { schema } from 'normalizr';

export const surveySchema = new schema.Entity('surveys');
export const surveyListSchema = [surveySchema];
export const recipientSchema = new schema.Entity('recipients');
export const recipientListSchema = [recipientSchema];
