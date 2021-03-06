package mmp.gps.logic.dao;

import mmp.gps.domain.multimedia.MediaContentDto;
import mmp.gps.domain.multimedia.MultimediaInfoDto;

import java.util.Date;
import java.util.List;

public interface IMultimediaDao {

    int queryPageCount(String deviceNumber, Date start, Date end);

    List<MultimediaInfoDto> queryPageDetail(String deviceNumber, Date start, Date end, int pageIndex, int pageSize)
            throws Exception;

    MediaContentDto read(String id) throws Exception;
}
