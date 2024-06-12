import { Body, Controller, Delete, Get, Param, Post, Put, HttpCode, ParseUUIDPipe, ParseEnumPipe } from "@nestjs/common";

import { ReportType } from "./data";
import { AppService } from "./app.service";

@Controller('report/:reportType')
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Get()
  getAllReports(@Param('reportType', new ParseEnumPipe(ReportType)) reportType: ReportType) {
    if (reportType != ReportType.EXPENCE && reportType != ReportType.INCOME) return false;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('reportType', new ParseEnumPipe(ReportType)) reportType: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    if (reportType != ReportType.EXPENCE && reportType != ReportType.INCOME) return false;

    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Param('reportType', new ParseEnumPipe(ReportType)) reportType: ReportType,
    @Body() body: {
      amount: number,
      source: string,
    }
  ) {
    if (reportType != ReportType.EXPENCE && reportType != ReportType.INCOME) return false;

    return this.appService.createReport(reportType, body);
  }

  @Put(":id")
  updateReport(
    @Param('reportType', new ParseEnumPipe(ReportType)) reportType: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: {
      amount: number,
      source: string,
    }
  ) {
    if (reportType != ReportType.EXPENCE && reportType != ReportType.INCOME) return false;

    return this.appService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(":id")
  deleteReport(
    @Param('reportType', new ParseEnumPipe(ReportType)) reportType: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    if (reportType != ReportType.EXPENCE && reportType != ReportType.INCOME) return false;

    return this.appService.deleteReport(id);
  }
}