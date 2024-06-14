import { Body, Controller, Delete, Get, Param, Post, Put, HttpCode, ParseUUIDPipe, ParseEnumPipe } from "@nestjs/common";

import { ReportType } from "../data";
import { ReportService } from "./report.service";
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from "../dtos/report.dto";

@Controller('report/:reportType')
export class ReportController {

    constructor(private readonly reportService: ReportService) { }

    @Get()
    getAllReports(@Param('reportType', new ParseEnumPipe(ReportType)) reportType: ReportType): ReportResponseDto[] {
        if (reportType != ReportType.EXPENCE && reportType != ReportType.INCOME) return [];
        return this.reportService.getAllReports(reportType);
    }

    @Get(':id')
    getReportById(
        @Param('reportType', new ParseEnumPipe(ReportType)) reportType: ReportType,
        @Param('id', ParseUUIDPipe) id: string,
    ): ReportResponseDto {
        if (reportType != ReportType.EXPENCE && reportType != ReportType.INCOME) return;

        return this.reportService.getReportById(reportType, id);
    }

    @Post()
    createReport(
        @Param('reportType', new ParseEnumPipe(ReportType)) reportType: ReportType,
        @Body() body: CreateReportDto
    ): ReportResponseDto {
        if (reportType != ReportType.EXPENCE && reportType != ReportType.INCOME) return;

        return this.reportService.createReport(reportType, body);
    }

    @Put(":id")
    updateReport(
        @Param('reportType', new ParseEnumPipe(ReportType)) reportType: ReportType,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() body: UpdateReportDto
    ): ReportResponseDto {
        if (reportType != ReportType.EXPENCE && reportType != ReportType.INCOME) return;

        return this.reportService.updateReport(reportType, id, body);
    }

    @HttpCode(204)
    @Delete(":id")
    deleteReport(
        @Param('reportType', new ParseEnumPipe(ReportType)) reportType: ReportType,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        if (reportType != ReportType.EXPENCE && reportType != ReportType.INCOME) return false;

        return this.reportService.deleteReport(id);
    }
}