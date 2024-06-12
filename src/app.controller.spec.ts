import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportType } from './data';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getAllReports: jest.fn(),
            getReportById: jest.fn(),
            createReport: jest.fn(),
            updateReport: jest.fn(),
            deleteReport: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getAllReports', () => {
    it('should return all reports for valid report type', () => {
      const result = [{ id: '1', amount: 100, source: 'source' }];
      jest.spyOn(appService, 'getAllReports').mockImplementation(() => result as any);

      expect(appController.getAllReports(ReportType.EXPENCE)).toBe(result);
      expect(appController.getAllReports(ReportType.INCOME)).toBe(result);
    });

    it('should return false for invalid report type', () => {
      expect(appController.getAllReports('INVALID' as ReportType)).toBe(false);
    });
  });

  describe('getReportById', () => {
    it('should return a report for valid report type and id', () => {
      const result = { id: '1', amount: 100, source: 'source' };
      jest.spyOn(appService, 'getReportById').mockImplementation(() => result as any);

      expect(appController.getReportById(ReportType.EXPENCE, '1')).toBe(result);
      expect(appController.getReportById(ReportType.INCOME, '1')).toBe(result);
    });

    it('should return false for invalid report type', () => {
      expect(appController.getReportById('INVALID' as ReportType, '1')).toBe(false);
    });
  });

  describe('createReport', () => {
    it('should create a report for valid report type', () => {
      const result = { id: '1', amount: 1255, source: 'asdfasdf' };
      jest.spyOn(appService, 'createReport').mockImplementation(() => result as any);

      expect(appController.createReport(ReportType.EXPENCE, { amount: 1255, source: 'asdfasdf' })).toBe(result);
      expect(appController.createReport(ReportType.INCOME, { amount: 1255, source: 'asdfasdf' })).toBe(result);
    });

    it('should return false for invalid report type', () => {
      expect(appController.createReport('INVALID' as ReportType, { amount: 1255, source: 'asdfasdf' })).toBe(false);
    });
  });

  describe('updateReport', () => {
    it('should update a report for valid report type and id', () => {
      const result = { id: '1', amount: 200, source: 'new source' };
      jest.spyOn(appService, 'updateReport').mockImplementation(() => result as any);

      expect(appController.updateReport(ReportType.EXPENCE, '1', { amount: 200, source: 'new source' })).toBe(result);
      expect(appController.updateReport(ReportType.INCOME, '1', { amount: 200, source: 'new source' })).toBe(result);
    });

    it('should return false for invalid report type', () => {
      expect(appController.updateReport('INVALID' as ReportType, '1', { amount: 200, source: 'new source' })).toBe(false);
    });
  });

  describe('deleteReport', () => {
    it('should delete a report for valid report type and id', () => {
      const result = true;
      jest.spyOn(appService, 'deleteReport').mockImplementation(() => result);

      expect(appController.deleteReport(ReportType.EXPENCE, '1')).toBe(result);
      expect(appController.deleteReport(ReportType.INCOME, '1')).toBe(result);
    });

    it('should return false for invalid report type', () => {
      expect(appController.deleteReport('INVALID' as ReportType, '1')).toBe(false);
    });
  });
});