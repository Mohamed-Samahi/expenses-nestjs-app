import { Injectable } from "@nestjs/common";

import data, { ReportType } from "./data";

import { v4 as uuid } from "uuid";

interface ReportData {
  amount: number,
  source: string
}

interface UpdateReportData {
  amount?: number,
  source?: string
}

@Injectable()
export class AppService {
  getAllReports(reportType: ReportType) {
    return data.report.filter(report => report.type === reportType);
  }

  getReportById(reportType: ReportType, id: string) {
    return data.report.filter(report => report.id === id && report.type === reportType);
  }

  createReport(reportType: ReportType, { amount, source }: ReportData) {
    const newReport = {
      id: uuid(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type: reportType
    }

    data.report.push(newReport);
    return {
      success: "Added Successfully",
      newReport
    }
  }

  updateReport(ReportData: ReportType, id: string, body: UpdateReportData) {
    let reportToUpdate = data.report
      .find(report => report.id === id);

    if (!reportToUpdate) return false;

    const reportIndex = data.report.findIndex(report => report.id === reportToUpdate.id);

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    }

    return data.report[reportIndex];
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex(report => report.id === id);

    if (reportIndex === -1) return false;

    data.report.splice(reportIndex, 1);

    return true;
  }
}