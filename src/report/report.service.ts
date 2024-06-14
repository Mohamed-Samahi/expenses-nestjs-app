import { Injectable } from "@nestjs/common";

import data, { ReportType } from "../data";

import { v4 as uuid } from "uuid";
import { ReportResponseDto } from "../dtos/report.dto";

interface ReportData {
    amount: number,
    source: string
}

interface UpdateReportData {
    amount?: number,
    source?: string
}

@Injectable()
export class ReportService {
    getAllReports(reportType: ReportType): ReportResponseDto[] {
        return data.report.filter(report => {
            if (report.type === reportType) {
                return new ReportResponseDto(report);
            }
        });
    }

    getReportById(reportType: ReportType, id: string): ReportResponseDto {
        return new ReportResponseDto(data.report.find(report => report.id === id && report.type === reportType));
    }

    createReport(reportType: ReportType, { amount, source }: ReportData): ReportResponseDto {
        const newReport = {
            id: uuid(),
            amount,
            source,
            created_at: new Date(),
            updated_at: new Date(),
            type: reportType
        }

        data.report.push(newReport);
        return new ReportResponseDto(newReport);
    }

    updateReport(ReportData: ReportType, id: string, body: UpdateReportData): ReportResponseDto {
        let reportToUpdate = data.report
            .find(report => report.id === id);

        if (!reportToUpdate) return;

        const reportIndex = data.report.findIndex(report => report.id === reportToUpdate.id);

        data.report[reportIndex] = {
            ...data.report[reportIndex],
            ...body,
            updated_at: new Date(),
        }

        return new ReportResponseDto(data.report[reportIndex]);
    }

    deleteReport(id: string) {
        const reportIndex = data.report.findIndex(report => report.id === id);

        if (reportIndex === -1) return false;

        data.report.splice(reportIndex, 1);

        return true;
    }
}